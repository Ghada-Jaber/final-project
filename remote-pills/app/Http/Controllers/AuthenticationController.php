<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Exception;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;

use Firebase\Auth\Token\Exception\InvalidToken;


use Lcobucci\JWT\Token\Plain;
use Lcobucci\JWT\Token\Parser;


class AuthenticationController extends Controller
{

    public function login(Request $request){
         // Launch Firebase Auth
        $auth = app('firebase.auth');
        // Retrieve the Firebase credential's token
        $idTokenString = $request->input('Firebasetoken');

        
        try { // Try to verify the Firebase credential token with Google
            
            $verifiedIdToken = $auth->verifyIdToken($idTokenString);
            
        } catch (\InvalidArgumentException $e) { // If the token has the wrong format
            
            return response()->json([
                'message' => 'Unauthorized - Can\'t parse the token: ' . $e->getMessage()
            ], 401);        
            
        } catch (InvalidToken $e) { // If the token is invalid (expired ...)
            
            return response()->json([
                'message' => 'Unauthorized - Token is invalide: ' . $e->getMessage()
            ], 401);
            
        }

        // Retrieve the UID (User ID) from the verified Firebase credential's token
        $uid = $verifiedIdToken->getClaim('sub');

       

        $getRequest = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_token' => 'boolean',
        ]);

        $login = [
            'email' => $getRequest['email'],
            'password' => $getRequest['password'],
            'active' => 1
        ];

        if(!Auth::attempt($login))
      {
        return response()->json(['error'=>'Unauthorised'], 401);
      }


       // Retrieve the user model linked with the Firebase UID
       $user = User::where('FirebaseUID',$uid)->first();

        $tokenResult = $user->createToken('personal token');
        
        // Store the created token
        $token = $tokenResult->token;
        
        
        // Add a expiration date to the token
        if($request['remember_token']){
            $token->expires_at = Carbon::now()->addWeeks(1);
            $user->remember_token = $tokenResult->accessToken;
            $user->save();
        }else{
            $token->expires_at = Carbon::now()->addDays(5);
        }
        
        // Save the token to the user
        $token->save();
        
        // Return a JSON object containing the token datas
        // You may format this object to suit your needs
        return response()->json([
            'role' => $user->roles,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
            $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }



    public function logout(){
        $user = Auth::user();
        if($user instanceOf User)
            $user->token()->revoke();
        return response()->json([
            'information' => 'you are logout'
        ], 201);
    }
    
    public function register(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email', //|exists:users
            'password' => 'required',
            'confirm_password' => 'required|same:password',
            'birthday' => 'required',
            // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg'
        ]);

        $auth = app('firebase.auth');
        // Retrieve the Firebase credential's token
        $idTokenString = $request->input('Firebasetoken');

        
        try { // Try to verify the Firebase credential token with Google
            
            $verifiedIdToken = $auth->verifyIdToken($idTokenString);
            
        } catch (\InvalidArgumentException $e) { // If the token has the wrong format
            
            return response()->json([
                'message' => 'Unauthorized - Can\'t parse the token: ' . $e->getMessage()
            ], 401);        
            
        } catch (InvalidToken $e) { // If the token is invalid (expired ...)
            
            return response()->json([
                'message' => 'Unauthorized - Token is invalide: ' . $e->getMessage()
            ], 401);
            
        }

        // Retrieve the UID (User ID) from the verified Firebase credential's token
        $uid = $verifiedIdToken->getClaim('sub');
        try {

        if($request->hasFile('image')){
              $image = $request['image']->store('public/uploads/userimage');

        }else{
            $image = "public/uploads/userimage/NoImage.png";
        }

        $url = Storage::url($image);
  
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
            'image' => $url,
            'birthday' => $request['birthday'],
            'street_id' => $request['street_id'],
            'FirebaseUID' => $uid,
          ]);
        
          $user->setRoles([$request['role']]);
          $user->save();


          if($user instanceOf User)
          $getToken = $user->createToken('personal token');
      $token = $getToken->token;


      $token->save();

      return response()->json([
          'access' => $getToken->accessToken,
          'token' => 'Bearer',
          'expires' => Carbon::parse(
              $token->expires_at
          )->toDateTimeString()
      ],200);

        } catch (Exception $e){
            return response()->json(["test" => $e], 200);
            $errorCode = $e->errorInfo[1];
            if($errorCode == 1062){
                return response()->json(['email' =>'already taken'], 200);
            }
          }

          
          
    }


    public function details(){
        $user = auth()->user();
        $street = $user->street;
        $city = $user->street->city;
        $country = $user->street->city->country;
        $user->street = $street;
        $user->city = $city;
        $user->country = $country;
        return response()->json($user, 200);
    }

    public function setProfile(Request $request){
      


        $u = Auth::user();
        $user = User::find($u->id);
        if($request['password'] !="****"){
            $user->password = bcrypt($request['password']);
        }
        
        $user->birthday = $request['birthday'];
        $user->street_id = $request['street_id'];
        $user->save();


        return response()->json([
            'access' => 'change'],200);
    }
}

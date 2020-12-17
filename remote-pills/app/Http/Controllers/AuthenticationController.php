<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Exception;
use App\Models\User;
use Illuminate\Database\QueryException;

class AuthenticationController extends Controller
{

    public function login(Request $request){

        $getRequest = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_token' => 'boolean',
        ]);

        $login = [
            'email' => $getRequest['email'],
            'password' => $getRequest['password']
        ];

        if(!Auth::attempt($login))
      {
        return response()->json(['error'=>'Unauthorised'], 401);
      }

        $user = Auth::user();
        if($user instanceOf User)
            $getToken = $user->createToken('personal token');

        $token = $getToken->token;

        if($request['remember_token']){
            $token->expires_at = Carbon::now()->addDays(15);
        }else{
            $token->expires_at = Carbon::now()->addDays();
        }
        $token->save();

        return response()->json([
            'access' => $getToken->accessToken,
            'token' => 'Bearer',
            'expires' => Carbon::parse(
                $token->expires_at
            )->toDateTimeString()
        ],200);

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

       

        try {

        if($request->hasFile('image')){
            // $img = $request->file('image');
            // $fileNameWithExt = $img->getClientOriginalName(); // all file name with extension
     
            // $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME); //only file name without extension
            // $fileExt = $img->getClientOriginalExtension(); // file extension
            // $fileNameToStore = $fileName.'_'. time() .'.'.$fileExt; // a timing to diffrent between image 

            //  if(!File::exists(public_path()."/images/userimage")) {

            //     File::makeDirectory(public_path()."/images/userimage");
                
            //  }
             
            //  $img->move(public_path().'/images/userimage/', $fileNameToStore);
             //$img->move('uploads/', $fileNameToStore);

             $image = $request['image']->store('uploads/userimage');
             

        }else{
            $image = "uploads/userimage/NoImage.png";
        }

        

        
            
            
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
            'image' => $image,
            'birthday' => $request['birthday'],
            'street_id' => $request['street_id'],
          ]);

        
          $user->setRoles(['ROLE_NORMALUSER']);
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
        $street = $user->street->name;
        $city = $user->street->city->name;
        $country = $user->street->city->country->name;
        $user->address = $street." , ".$city." , ".$country;
        return response()->json($user, 200);
    }

    public function setProfile(Request $request){

        //return response()->json(['test' => $request->hasFile('image')],200);
       
        if($request->hasFile('image')){
            
            $img = $request->file('image');
            $fileNameWithExt = $img->getClientOriginalName(); // all file name with extension
     
            $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME); //only file name without extension
            $fileExt = $img->getClientOriginalExtension(); // file extension
            $fileNameToStore = $fileName.'_'. time() .'.'.$fileExt; // a timing to diffrent between image 

             if(!File::exists(public_path()."/images/userimage")) {

                File::makeDirectory(public_path()."/images/userimage");
                
             }

             return response()->json(['test' => $fileNameToStore],200);
             
             $img->move(public_path().'/images/userimage/', $fileNameToStore);

        }else{
            
            $fileNameToStore = "NoImage.png";
        }

        $u = Auth::user();
        $user = User::find($u->id);
        $user->image = $fileNameToStore;
        $user->save();


        return response()->json([
            'access' => 'change'],200);
    }
}

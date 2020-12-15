<?php

namespace App\Role;

use App\Models\User;

/**
 * Class RoleChecker
 * @package App\Role
 */
class RoleChecker
{
    /**
     * @param User $user
     * @param string $role
     * @return bool
     */
    public function check(User $user, string $role)
    {
        
        // Admin has everything
        if ($user->hasRole(UserRole::ROLE_ADMIN)) {
            
            return true;
        }
        else if($user->hasRole(UserRole::ROLE_PHARMACY)) {
            
            $pharmacyRoles = UserRole::getAllowedRoles(UserRole::ROLE_PHARMACY);

            if (in_array($role, $pharmacyRoles)) {
                return true;
            }
        } 

        

        return $user->hasRole($role);
    }
}

?>
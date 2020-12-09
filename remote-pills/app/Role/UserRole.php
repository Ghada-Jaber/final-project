<?php

namespace App\Role;


class UserRole 
{
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_PHARMACY = 'ROLE_PHARMACY';
    const ROLE_DOCTOR = 'ROLE_DOCTOR';
    const ROLE_NORMALUSER = 'ROLE_NORMALUSER';

    /**
     * @var array
     */
    protected static $roleHierarchy = [
        self::ROLE_ADMIN => ['*'],
        self::ROLE_PHARMACY => [
            self::ROLE_NORMALUSER,
        ],
        self::ROLE_DOCTOR => [
            self::ROLE_NORMALUSER
        ],
        self::ROLE_NORMALUSER => []
    ];

    /**
     * @param string $role
     * @return array
     */
    public static function getAllowedRoles(string $role)
    {
        if (isset(self::$roleHierarchy[$role])) {
            return self::$roleHierarchy[$role];
        }

        return [];
    }

    /***
     * @return array
     */
    public static function getRoleList()
    {
        return [
            static::ROLE_ADMIN =>'Admin',
            static::ROLE_PHARMACY => 'Pharmacy',
            static::ROLE_DOCTOR => 'Doctor',
            static::ROLE_NORMALUSER => 'Patient/Customer',
        ];
    }
}

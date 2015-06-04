<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;
use Phalcon\Mvc\Model\Validator\Uniqueness as UniquenessValidator;

class Users extends BaseModel
{


	public function getSource()
    {
    	return 'user_main';
    }

	public $id;

	public $email;

	public $hash;

	public $status;
	public $groups;

    public function initialize()
    {
       $this->allowEmptyString(array('lastName'));
       $this->skipAttributesOnCreate(array('registrationDate','lastLogin'));
    }

	public function validation()
            {

                $this->validate(new UniquenessValidator(
                    array(
                        "field"   => "email",
                        "message" => "Пользователь с таким email уже существует"
                    )
                ));

                $this->validate(new EmailValidator(array(
                            'field' => 'email'
                )));

                return $this->validationHasFailed() != true;
            }

}
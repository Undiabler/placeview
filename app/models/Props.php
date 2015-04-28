<?php

use Phalcon\Mvc\Model;

class Props extends Model
{

	public function getSource()
    {
    	return 'camp_props';
    }

	public $id;

	public $type;

	public $name;

}
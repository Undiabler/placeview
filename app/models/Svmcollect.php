<?php

use Phalcon\Mvc\Model;

class Svmcollect extends Model
{

	public function getSource()
    {
    	return 'svm_collect';
    }

    public function initialize()
    {
       $this->skipAttributesOnCreate(array('updated','converted'));
    }

	public $id;

	public $ip;

	public $c1;
	public $c2;
	public $c3;
	public $c4;
	public $c5;
	public $c6;
	public $c7;
	public $c8;
	public $c9;
	public $c10;

	public $created;
	
	public $updated;

	public $converted;

}
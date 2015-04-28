<?php

use Phalcon\Mvc\Model;

class Camps extends Model
{

	public function getSource()
    {
    	return 'campains';
    }

    public function getRoi(){
    	return $this->spent==0?0:round(($this->earned-$this->spent)*100/$this->spent);
    }

    public function getProfit(){
    	return  $this->earned-$this->spent;
    }

	public $id;

	public $name;

	public $type;

	public $rotate;

	public $rotate_vec;

	public $landpages_arr;

	public $offers_arr;

	public $traff_prs;
	// public $

	public $group_id;

	public $source_id;
	
	public $clicks;

	public $ctr;

	public $leads;

	public $cvr;

	public $epc;

	public $cpc;

	public $spent;

	public $earned;

	public function beforeSave(){
		$this->rotate_vec = join(',', $this->rotate_vec);
        $this->landpages_arr = join(',', $this->landpages_arr);
        $this->offers_arr = join(',', $this->offers_arr);

        if (empty($this->rotate_vec)) 		$this->rotate_vec=new \Phalcon\Db\RawValue('""');
        if (empty($this->landpages_arr)) 	$this->landpages_arr=new \Phalcon\Db\RawValue('""');
        if (empty($this->offers_arr)) 		$this->offers_arr=new \Phalcon\Db\RawValue('""');
	}


	public function afterFetch()
    {
    	// if (!$this->rotate_vec) var_dump($this->rotate_vec); exit();
        if (!$this->rotate_vec) $this->rotate_vec=new \Phalcon\Db\RawValue('""');
        if (!$this->landpages_arr) $this->landpages_arr=new \Phalcon\Db\RawValue('""');
        if (!$this->offers_arr) $this->offers_arr=new \Phalcon\Db\RawValue('""');

        $this->rotate_vec = explode(',', $this->rotate_vec);
        $this->landpages_arr = explode(',', $this->landpages_arr);
        $this->offers_arr = explode(',', $this->offers_arr);
    }





}
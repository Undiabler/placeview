<?php

use Phalcon\Mvc\Controller;

class AjaxController extends JsonController
{

	public function mapAction(){
		$tours = $this->extra->getSql('SELECT id,map_x,map_y,category_id from tours_main');
		$this->addjson('tours',$tours);
		$this->returnjson();
	}

}
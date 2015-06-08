<?php

use Phalcon\Mvc\Controller;

class AjaxController extends JsonController
{

	public function mapAction(){
		$tours = $this->extra->getSql('SELECT id,map_x,map_y,category_id from tours_main');
		$this->addjson('tours',$tours);
		$this->returnjson();
	}

	public function tourAction(){
		$id = $this->request->getQuery('id');
		$tour_main = $this->extra->getSql('SELECT * from tours_main WHERE id = ? ',[$id]);
		$tour_lang = $this->extra->getSql('SELECT * from tours_lang WHERE id = ? ',[$id]);
		$this->addjson('tours',['tour'=>$tours,'']);
		$this->returnjson();
	}

}
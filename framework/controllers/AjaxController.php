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
		$lang = $this->request->getQuery('lang',null,'en');
		$tour_main = $this->extra->getSql('SELECT * from tours_main WHERE id = ? ',[$id],true);
		
		$tour_lang = $this->extra->getSql('SELECT * from tours_lang WHERE id = ? AND lang = ? ',[$id,$lang],true);
		
		$langs = "'".implode("','",$this->config->langs->toArray())."'";

		if (!$tour_lang)
		$tour_lang = $this->extra->getSql("SELECT * from tours_lang WHERE id = ? ORDER BY FIELD(lang, $langs) ",[$id],true);
			

		$this->addjson('data',['tour'=>$tour_main,'text'=>$tour_lang]);
		$this->returnjson();
	}

	public function levelAction(){
		$id = $this->request->getQuery('id');
		$level = $this->request->getQuery('level');

		$this->db->execute("UPDATE pano_main SET level = ? WHERE id = ?",[$level,$id]);

	}

}
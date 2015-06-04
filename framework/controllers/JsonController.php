<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class JsonController extends Controller
{	

	private $json_out=array();

	public function initialize(){
		 $this->view->disable();
		 $this->response->setContentType("application/json");
	}

	public function addjson($key,$value=null){

		if ($value===null){
			if (is_array($key))
				$this->json_out=array_merge($this->json_out,$key);
		} else {
			$this->json_out[$key]=$value;
		}

		return $this;
	}

	public function returnjson($code=null,$message_s=null){

		$this->addjson('code',$code!==null?$code:0);
		if ($message_s) {
			if (is_array($message_s))
				$this->addjson('messages',$message_s);
			else
				$this->addjson('messages',[$message_s]);
		}
		echo json_encode($this->json_out);
		// $this->response->setJsonContent($this->json_out);

	}
}
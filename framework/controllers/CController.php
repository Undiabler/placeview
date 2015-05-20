<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class CController extends Controller
{

	public function onConstruct() {
		// var_dump('cc initialized');
		$lang = $this->dispatcher->getParam("language");
		// var_dump($lang);
		// var_dump('cc exit');
		// exit();
		if (!$lang) {
			$new_lang=substr($this->request->getBestLanguage(),0,2);
			if (file_exists(__DIR__."/../messages/".$new_lang.".php")){
				$this->config->lang=$new_lang;
				$server = $_SERVER['REQUEST_URI'];
				// if ($server)
				// var_dump();
				if ($server=='/') $server='/map';
				header("Location: /".$this->config->lang.$server);
				// $this->response->redirect();
				exit();
			}
		} else {
			$this->config->lang=$lang;
			// var_dump($this->config->lang);
			// exit;
		}
		$this->view->setVar("t", $this->_getTranslation());
	}

	protected function _getTranslation()
	{
		$messages = include __DIR__."/../messages/".$this->config->lang.".php";

		// var_dump($this->config->lang);
		// exit;

		if (!is_array($messages)) $messages = [];

		return new \Phalcon\Translate\Adapter\NativeArray(array(
		   "content" => $messages
		));
	}

}

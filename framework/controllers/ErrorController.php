<?php
use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class ErrorController extends CController
{
	public function initialize()
    {
		$this->view->disableLevel(array(
	        View::LEVEL_LAYOUT => false,
	        View::LEVEL_MAIN_LAYOUT => false
	    ));
        $this->view->setTemplateAfter('error');
        $this->view->pick("index/error");
    }

	public function error404Action()
	{
		$this->view->setVar('error',404);
		$this->view->setVar('message','Такая страница отсуствует');
	}
	public function error401Action()
	{
		if ($this->session->get('auth')){
			$this->view->setVar('error',401);
			$this->view->setVar('message','Страница не входит в список разрешенных для посещения');
		}
		else
			$this->response->redirect();
	}
	public function error500Action()
	{
		$this->view->setVar('error',500);
		$this->view->setVar('message','Внутренняя ошибка');
	}

}

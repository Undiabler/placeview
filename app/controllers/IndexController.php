<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class IndexController extends Controller
{

	public function indexAction()
	{
		// $this->response->redirect('cpanel');
	}

	public function peopleAction()
	{
		// $this->response->redirect('cpanel');
	}

	public function loginAction(){

		if ($this->session->get('auth'))
			$this->response->redirect('cpanel');


		$uname=$this->request->getPost('username');
		$upass=$this->request->getPost('userpass');

		if ($uname&&$upass){

			if ($uname=='admin' && $upass=='12345qs'){

				$this->session->set('auth', array(
				    // 'id' => $user->id,
				    'name' => $uname
				));
				$this->response->redirect('cpanel');
			} else {
				$this->flash->error('<p>Нет такой комбинации</p>');
			}

		}


		$this->view->disableLevel(array(
	        View::LEVEL_LAYOUT => false,
	        View::LEVEL_MAIN_LAYOUT => false
	    ));
	}

}

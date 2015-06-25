<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

trait LoginTrait {

	private static function messages($status){
		$types = [
		// TODO: поменять на нормальные строки с переводами
		2 => 'Аккаунт временно недоступен.',
		3 => 'Аккаунт забанен.'
		];
		return $types[$status];
	}

	private function login(){
		$uname=$this->request->getPost('login_email');
		$upass=$this->request->getPost('login_password');
		$this->tag->setDefault('login_password','');

		if ($uname&&$upass){

			$user=Users::findFirst(['email = :name:','bind'=>['name'=>$uname]]);
			
			if ($user && password_verify($upass,$user->hash)){

				switch ($user->status) {
					case 2:
					case 3:
						return $this->flash->success('<p>'.self::messages($user->status).'</p>');
						break;
						
					case 1: break;
					
					default:
						return $this->flash->success('<p>'.('Доступ запрещен').'</p>');
						break;
				}

				$this->db->execute('UPDATE user_main SET last_visit = ? WHERE id = ?',[date( 'Y-m-d H:i:s'),$user->id]);

				$this->user->setAttr($user->id,($user->groups==1?'Admins':'Users'),$user);
				
				$this->response->redirect();

			} else {
				$this->flash->error('<p>'.('Такой комбинации не существует').'</p>');
			}

		}
	}

    public function sign_upAction() {
		$this->view->disableLevel(array(
            View::LEVEL_LAYOUT => false,
            View::LEVEL_MAIN_LAYOUT => false
        ));
        $this->view->setTemplateAfter('login');
        $this->login();
	}

	public function sign_inAction() {
		$this->view->disableLevel(array(
            View::LEVEL_LAYOUT => false,
            View::LEVEL_MAIN_LAYOUT => false
        ));	
        $this->view->setTemplateAfter('login');
	    $this->login();
	}

	public function logoutAction(){
		$this->session->destroy();
		$this->response->redirect();
		$this->view->disable();
	}

}
<?php

if (!defined('BASEPATH'))  exit('No direct script access allowed');

class DealsController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('dealsModel');
    }


    function getAllDeals()
    {
        $data = $this->dealsModel->getAllDeals();
        echo json_encode($data);
    }
}

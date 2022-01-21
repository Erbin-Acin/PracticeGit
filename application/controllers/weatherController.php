<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class WeatherController extends CI_Controller
{
    public $weatherAPIKEY;

    public function __construct()
    {
        parent::__construct();
        $this->weatherAPIKEY = 'e7d0b0ea841ab2f5a9e7262d8b73ff8c';
        $this->load->model('apiCallsModel');
    }

    function currentWeather()
    {
        $data = $this->input->get(null,TRUE);
        $data['appid'] = $this->weatherAPIKEY;
        $return = $this->apiCallsModel->getAPI('http://api.openweathermap.org/data/2.5/weather',$data);
        echo $return;
    }
}

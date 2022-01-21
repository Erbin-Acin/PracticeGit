<?php
class ApiCallsModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    function getAPI($url, $data)
    {
        $url = sprintf("%s?%s", $url, http_build_query($data));
        $result = file_get_contents($url);

        // $curl = curl_init();
        // curl_setopt($curl, CURLOPT_URL, $url);
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        // $result = curl_exec($curl);
        // curl_close($curl);
        
        return $result;
    }
}

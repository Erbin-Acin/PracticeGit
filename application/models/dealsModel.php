<?php
class DealsModel extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	public function getAllDeals()
	{
		$query = $this->db->get('deals');
		return $query->result();
	}
}

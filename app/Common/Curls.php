<?php

class Curls
{
	public function create_params($param)
	{
		$params = "";
		foreach ($param as $key => $value) {
			$params .= $key . "=" . $value . "&";
		}
		$params = rtrim($params, "&");
		return $params;
	}


	public function curl($url, $param, $decode = true)
	{
		//$param = $this->create_params($param);

		$url = URL_PATH . $url;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
		// Receive server response ...
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);

		curl_close($ch);
		if ($decode)
			return json_decode($result);
		else
			return $result;
	}

	public function curl_with_token($urls, $param, $decode = true)
	{

		//$param = $this->create_params($param);

		$url = URL_PATH . $urls;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['token'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$result = curl_exec($ch);
		curl_close($ch);
		$results = json_decode($result);
		if ($results->status == "false" && $results->err == "expire token") {
			$token = $this->get_new_token();

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				"Accept: application/json",
				"Authorization: Bearer " . $token,
			));
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

			$result = curl_exec($ch);
	
			if ($decode)
				return json_decode($result);
			else
				return $result;
			curl_close($ch);
		}
		if ($decode)
			return json_decode($result);
		else
			return $result;
	}
	
	
	public function curl_with_token_business($urls, $param, $decode = true)
	{

	
		$url = URL_PATH . $urls;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['bussiness_token'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$result = curl_exec($ch);

	
		curl_close($ch);
		$results = json_decode($result);
		if ($results->status == "false" && $results->err == "expire token") {
			$token = $this->get_new_token_business();

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				"Accept: application/json",
				"Authorization: Bearer " . $token,
			));
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			$result = curl_exec($ch);
	
			if ($decode)
				return json_decode($result);
			else
				return $result;
			curl_close($ch);
		}
		if ($decode)
			return json_decode($result);
		else
			return $result;
	}

	public function curl_with_token_professional($urls, $param, $decode = true)
	{

		$url = URL_PATH . $urls;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['professional_token'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$result = curl_exec($ch);



		curl_close($ch);
		$results = json_decode($result);
		if ($results->status == "false" && $results->err == "expire token") {
			$token = $this->get_new_token_type("professional_token");

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				"Accept: application/json",
				"Authorization: Bearer " . $token,
			));
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			$result = curl_exec($ch);
	
			if ($decode)
				return json_decode($result);
			else
				return $result;
			curl_close($ch);
		}
		if ($decode)
			return json_decode($result);
		else
			return $result;
	}

	public function curl_with_token_team($urls, $param, $decode = true)
	{

		$url = URL_PATH . $urls;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['team_token'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$result = curl_exec($ch);
	
		curl_close($ch);
		$results = json_decode($result);
		if ($results->status == "false" && $results->err == "expire token") {
			$token = $this->get_new_token_team();

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				"Accept: application/json",
				"Authorization: Bearer " . $token,
			));
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			$result = curl_exec($ch);
	
			if ($decode)
				return json_decode($result);
			else
				return $result;
			curl_close($ch);
		}
		if ($decode)
			return json_decode($result);
		else
			return $result;
	}

	public function curl_with_token_admin($urls, $param, $decode = true)
	{

		//$param = $this->create_params($param);
		$url = URL_PATH . $urls;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['tokeAdmin'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$result = curl_exec($ch);
		curl_close($ch);
		$results = json_decode($result);

		if ($results->status == "false" && $results->err == "expire token") {
			$token = $this->get_new_token_admin();

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				"Accept: application/json",
				"Authorization: Bearer " . $token,
			));
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

			$result = curl_exec($ch);
	
			if ($decode)
				return json_decode($result);
			else
				return $result;
			curl_close($ch);
		}
		if ($decode)
			return json_decode($result);
		else
			return $result;
	}
	
	public function get_new_token_admin()
	{

	
		$url = URL_PATH . "token/getToken";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['tokeAdmin'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

		$result = curl_exec($ch);
		curl_close($ch);
		$result = json_decode($result);
	
		if ($result->status == "true") {
			setcookie("tokeAdmin", $result->data, time() + (86400 * 365), "/");

		}
		return $result->data;
	}

	public function get_new_token_business()
	{

	
		$url = URL_PATH . "token/getToken";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['bussiness_token'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

		$result = curl_exec($ch);
		curl_close($ch);
		$result = json_decode($result);
	
		if ($result->status == "true") {
			setcookie("bussiness_token", $result->data, time() + (86400 * 365), "/");

		}
		return $result->data;
	}

	public function get_new_token_team()
	{

	
		$url = URL_PATH . "token/getToken";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['team_token'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

		$result = curl_exec($ch);
		curl_close($ch);
		$result = json_decode($result);
	
		if ($result->status == "true") {
			setcookie("team_token", $result->data, time() + (86400 * 365), "/");

		}
		return $result->data;
	}

	public function get_new_token()
	{

	
		$url = URL_PATH . "token/getToken";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE['token'],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

		$result = curl_exec($ch);
		curl_close($ch);
		$result = json_decode($result);
	
		if ($result->status == "true") {
			setcookie("token", $result->data, time() + (86400 * 365), "/");
			//setcookie("token", $result->data, time() + (86400 * 365), "/", URL_Domain, false, true); // 86400 = 1 day

		}
		return $result->data;
	}
	
	public function get_new_token_type($type)
	{

	
		$url = URL_PATH . "token/getToken";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Authorization: Bearer " . $_COOKIE[$type],
		));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

		$result = curl_exec($ch);
		curl_close($ch);
		$result = json_decode($result);
	
		if ($result->status == "true") {
			setcookie($type, $result->data, time() + (86400 * 365), "/");
			//setcookie("token", $result->data, time() + (86400 * 365), "/", URL_Domain, false, true); // 86400 = 1 day

		}
		return $result->data;
	}
}

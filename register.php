<?php
	$conn = mysqli_connect('localhost','root','root','countMoney');
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$score = $_POST['score'];
	if($conn->connect_error){
		// echo 'connect fail';
	}else{
		$selectSql = "select * from user where name='$name'";
		$rankSql = "select * from user where score>$score";
		
		$result = $conn->query($selectSql);
		if(mysqli_affected_rows($conn)){
			$arr = $result->fetch_assoc();
			if($arr['score'] < $score){
				$sql = "update user set score ='$score' where name = '$name'";
				$conn->query($sql);
			} 
		}else{

			$sql = "insert into user(name,phone,score) values('$name','$phone','$score')";
			$conn->query($sql);
		}
		$conn->query($rankSql);
		$rank = mysqli_affected_rows($conn);
		$result = $conn->query($selectSql);

		$arr = $result->fetch_assoc();
		$arr['rank'] = $rank + 1;
		echo json_encode($arr);
	}
?>
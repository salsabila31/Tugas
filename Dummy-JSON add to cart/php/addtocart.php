<?php
require_once "connector.php";

$idorder = 1;
$idbarang = 2;
$jumlah = 1;
$harga = 100;
$barang ="iphone";
$idpelanggan = 1;
$pelanggan = "joni";
$alamat = "alamat";

$sql = "INSERT INTO tblorderdetail VALUES ('' ,$idorder,$idbarang,$jumlah,$harga,'$barang',$idpelanggan,'$pelanggan','$alamat')";
$result = mysqli_query($con, $sql);


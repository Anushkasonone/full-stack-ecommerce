<?php require 'config.php';need_login();$u=user()['id'];
if($_SERVER['REQUEST_METHOD']=='POST'){$a=$_POST['action']??'';
 if($a=='add'){$pdo->prepare('INSERT INTO cart(user_id,product_id,qty) VALUES(?,?,?) ON DUPLICATE KEY UPDATE qty=qty+VALUES(qty)')->execute([$u,(int)$_POST['pid'],max(1,(int)($_POST['qty']??1))]);flash('Added to cart');header('Location: '.($_SERVER['HTTP_REFERER']??'cart.php'));exit;}
 if($a=='update')$pdo->prepare('UPDATE cart SET qty=? WHERE id=? AND user_id=?')->execute([max(1,(int)$_POST['qty']),(int)$_POST['id'],$u]);
 if($a=='remove')$pdo->prepare('DELETE FROM cart WHERE id=? AND user_id=?')->execute([(int)$_POST['id'],$u]);
 header('Location: cart.php');exit;}
$s=$pdo->prepare('SELECT c.id,c.qty,p.name,p.price,p.icon,p.stock FROM cart c JOIN products p ON p.id=c.product_id WHERE c.user_id=?');$s->execute([$u]);$rows=$s->fetchAll();
$tot=array_sum(array_map(fn($r)=>$r['qty']*$r['price'],$rows));head('Cart');?>
<h2>Your Cart</h2><?php if(!$rows):?><div class="box">Cart is empty. <a href="index.php" style="color:var(--p)">Continue shopping</a></div><?php else:?>
<div class="two"><div class="box"><table><?php foreach($rows as $r):?><tr><td style="font-size:34px"><?=$r['icon']?></td><td><?=e($r['name'])?><br><small><?=money($r['price'])?></small></td>
<td><form method="post"><input type="hidden" name="action" value="update"><input type="hidden" name="id" value="<?=$r['id']?>"><input type="number" name="qty" value="<?=$r['qty']?>" min="1" max="<?=$r['stock']?>" style="width:60px;padding:6px" onchange="this.form.submit()"></form></td>
<td><b><?=money($r['qty']*$r['price'])?></b></td><td><form method="post"><input type="hidden" name="action" value="remove"><input type="hidden" name="id" value="<?=$r['id']?>"><button class="btn out sm">✕</button></form></td></tr><?php endforeach?></table></div>
<div class="box"><h3>Summary</h3><div class="row"><span>Total</span><span class="price"><?=money($tot)?></span></div><br><a class="btn" href="checkout.php" style="display:block;text-align:center">Proceed to checkout</a></div></div><?php endif; foot();

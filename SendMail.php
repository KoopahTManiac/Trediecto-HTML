<?php



        // Contact subject
        $subject ="Kontakta Oss Message";

        // Details
        $message=$_GET['Name'];
        $message.="\n\n";
        $message.= $_GET['Message'];

        // Mail of sender
        $mail_from=$_GET['Email'];

        // From
        $header="from: <$mail_from>";

        // Enter your email address
        $to ='bata_zole@hotmail.com';
        $send_contact=mail($to,$subject,$message,$header);

        // Check, if message sent to your email
        // display message "We've recived your information"
        if($send_contact){
        echo "We've recived your contact information";
        }
        else {
        echo "ERROR";
        }

?>
<br/>
<a href="/">Go Back</a>
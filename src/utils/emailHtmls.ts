export const verifyAccountMailTemplate: string = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #352208;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #806443;
      }
      .header h1 {
        margin: 0;
        color: #333333;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h2 {
        color: #333333;
      }
      .content p {
        color: #666666;
        font-size: 16px;
        line-height: 1.5;
      }
      .content .code {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin: 20px 0;
        padding: 10px;
        border: 1px solid #352208;
        border-radius: 5px;
        background-color: #f9f9f9;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #999999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>
      <div class="content">
        <h2>Hello,</h2>
        <p>
          Thank you for registering with us. To complete your registration,
          please verify your email address by entering the following
          verification code:
        </p>
        <div class="code">{verificationToken}</div>
        <p>
          Your Code is Valid for 24hrs.
          If you did not request this verification, please ignore this email.
        </p>
      </div>
      <div class="footer">
        <p>&copy; 2024 SkillVerse. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

export const welcomeMailTemplate: string = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-container {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 10px;
        max-width: 600px;
        margin: auto;
        border: 1px solid #352208;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      }
      .email-header {
        background-color: #806443;
        color: white;
        padding: 10px;
        text-align: center;
        border-radius: 10px 10px 0 0;
      }
      .email-body {
        padding: 20px;
        background-color: white;
        border-radius: 0 0 10px 10px;
      }
      .email-footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Welcome to SkillVerse!</h1>
      </div>
      <div class="email-body">
        <p>Hi {name},</p>
        <p>Congratulations! Your email has been successfully verified.</p>
        <p>
          We are excited to have you on board at SkillVerse. Explore our
          platform and enjoy our services.
        </p>
        <p>
          If you have any questions or need assistance, feel free to reach out
          to us.
        </p>
        <p>Best Regards,<br />The SkillVerse Team</p>
      </div>
      <div class="email-footer">
        <p>&copy; 2024 SkillVerse . All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

export const resetPasswordMailTemplate: string = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #352208;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #806443;
      }
      .header h1 {
        margin: 0;
        color: #333333;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h2 {
        color: #333333;
      }
      .content p {
        color: #666666;
        font-size: 16px;
        line-height: 1.5;
      }
      .content .code {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin: 20px 0;
        padding: 10px;
        border: 1px solid #352208;
        border-radius: 5px;
        background-color: #f9f9f9;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #999999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Reset your Password</h1>
      </div>
      <div class="content">
        <p>
          Hi, <br />
          We received a request to reset your password. Please Create a new
          Password by entering the following verification code:
        </p>
        <div class="code">{verificationToken}</div>
        <p>
          Your Code is Valid for 24hrs.
          If you did not request a Password Reset, please ignore this email.
        </p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;

export const resetPasswordSuccessMailTemplate: string = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-container {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 10px;
        max-width: 600px;
        margin: auto;
        border: 1px solid #352208;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      }
      .email-header {
        background-color: #806443;
        color: white;
        padding: 10px;
        text-align: center;
        border: 1px solid #352208;
        border-radius: 10px 10px 0 0;
      }
      .email-body {
        padding: 20px;
        background-color: white;
        border-radius: 0 0 10px 10px;
      }
      .email-footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Password Reset Successful</h1>
      </div>
      <div class="email-body">
        <p>Hi,</p>
        <p>
          Your password has been successfully reset. You can now log in with
          your new password.
        </p>
        <p>
          If you did not request this change, please contact our support team
          immediately.
        </p>
        <p>Thank you,<br />The SkillVerse Team</p>
      </div>
      <div class="email-footer">
        <p>&copy; 2024 SkillVerse. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

export const coursePurchasedMailTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-container {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 10px;
        max-width: 600px;
        margin: auto;
        border: 1px solid #352208;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      }
      .email-header {
        background-color: #806443;
        color: white;
        padding: 10px;
        text-align: center;
        border-radius: 10px 10px 0 0;
      }
      .email-body {
        padding: 20px;
        background-color: white;
        border-radius: 0 0 10px 10px;
      }
      .email-footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>SkillVerse Course Details</h1>
      </div>
      <div class="email-body">
        <p>Hi {name},</p>
        <p>Congratulations! Course Purchased.</p>
        <p>
          You've Successfully Purchased the Course : {courseName} for ₹{price}<br />
          Your Payment ID : {paymentId} <br />
          You can use below given URL to go to your Course : <br />
          {courseprogressURL}
        </p>
        <p>
          If you have any questions or need assistance, feel free to reach out
          to us.
        </p>
        <p>Best Regards,<br />The SkillVerse Team</p>
      </div>
      <div class="email-footer">
        <p>&copy; 2024 SkillVerse . All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

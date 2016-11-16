//page.js controllers here

page('/', homeController.reveal);
page('/login', loginController.reveal);
page('/signup', signupController.reveal);
page('/about', aboutController.reveal);
page('/add-thread', addThreadController.reveal);
//possibly convert this to a not found handler
page('*', homeController.reveal);

page();

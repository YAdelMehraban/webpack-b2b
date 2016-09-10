import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.scss';
import MyClass from './dependency';

document.write('<h2> This is a demo..! </h2>');

document.write(MyClass.getTemplate());

console.log('app loaded');

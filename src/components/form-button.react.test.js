import React from 'react';
import ReactDOM from 'react-dom';
import FormButton from './form-button.react';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
	const form = document.createElement('form');
	ReactDOM.render(<FormButton label=""  onClick={()=>{}}/>, form);
});

it('renders label', () => {
	const button1 = shallow(<FormButton label="" onClick={()=>{}}/>);
	expect(button1.contains('lll')).toEqual(false);
	const button2 = shallow(<FormButton label="lll" onClick={()=>{}}/>);
	expect(button2.contains('lll')).toEqual(true);
});

it('triggers click handler', () => {
	const spy = jest.fn();
	const eventSpy = jest.fn();
	const button1 = shallow(<FormButton label="" onClick={spy}/>);
	button1.find('button').simulate('click', {preventDefault: eventSpy});
	expect(eventSpy).toBeCalled();
	expect(spy).toBeCalled();
});

// import React from 'react';
//  import { shallow, mount } from 'enzyme';
//  import NewUser from '../components/pages/NewUser';

//  describe('InputField component existing', () => {
//    it('should have an InputField component', () => {
//      const wrapper = shallow(<NewUser />);
//      expect(wrapper.find('InputField').exists()).toBeTruthy();
//    });
//  });

//  describe('NewUser Form - layout', () => {
//    let wrapper;

//    beforeEach(() => {
//      wrapper = mount(<NewUser />);
//    });

//    it('should have New user title', () => {
//      const text = wrapper.find('h2');
//      expect(text.text()).toBe('New user');
//    });

//    it('should have form', () => {
//      const form = wrapper.find('form');
//      expect(form).toHaveLength(1);
//    });

//    it('should have four inputfield', () => {
//      const input = wrapper.find('input');
//      expect(input).toHaveLength(4);
//    });

//    it('should have Email label', () => {
//      const label = wrapper.find('label[htmlFor="email"]');
//      expect(label.text()).toBe('Email address');
//    });

//    it('should have email inputfield', () => {
//      const inputEmail = wrapper.find('#email').last();
//      expect(inputEmail).toHaveLength(1);
//    });

//    it('should have Password label', () => {
//      const label = wrapper.find('label[htmlFor="password"]');
//      expect(label.text()).toBe('Password');
//    });

//    it('should have password inputfield', () => {
//      const inputPassword = wrapper.find('#password').last();
//      expect(inputPassword).toHaveLength(1);
//    });

//    it('should have button', () => {
//      const label = wrapper.find('button');
//      expect(label.text()).toBe('Save');
//    });
//  });

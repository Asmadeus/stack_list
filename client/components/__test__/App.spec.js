import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

const setup = (propsOverrides = {}) => {
  const props = {
    ...propsOverrides
  };

  const wrapper = shallow(<App {...props} />);

  return {
    props,
    wrapper,
  }
}

describe('<App />', () => {

  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: () => {
          return { items: [] }
        }
      })
    });
  });

  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  })
  
  it('initial state', () => {
    const { wrapper } = setup();
    expect(wrapper.state()).toEqual({ 
      loading: true, 
      modalIsOpen: false, 
      modalProps: {}, 
      page: 1, 
      questions: [] 
    });
  })
  
  it('should handle open modal', () => {
    const { wrapper } = setup();
    wrapper.instance().openModal({id: 1});
    expect(wrapper.state().modalIsOpen).toBe(true);
    expect(wrapper.state().modalProps).toEqual({id: 1});
  })

  it('should handle close modal', () => {
    const { wrapper } = setup();
    wrapper.instance().closeModal();
    expect(wrapper.state().modalIsOpen).toBe(false);
  })

  it('should handle scroll table', () => {
    const { wrapper } = setup();
    const event = {
      target: {
        scrollTop: 100,
        clientHeight: 400,
        scrollHeight: 500,
      }
    }
    wrapper.instance().scrollTable(event);
    expect(wrapper.state().page).toBe(2);
  })

})
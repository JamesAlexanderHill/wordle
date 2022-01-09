import React from 'react';

import M01Keyboard from '.';

export default {
    title: 'Molecule/M01Keyboard',
    component: M01Keyboard,
    argTypes: {},
};
  
const Template = (args) => <M01Keyboard {...args} />;
  
export const Default = Template.bind({});
Default.args = {};
import React from 'react';

import A01Key from '.';

export default {
    title: 'Atom/A01Key',
    component: A01Key,
    argTypes: {},
};
  
const Template = (args) => <A01Key {...args} />;
  
export const Default = Template.bind({});
Default.args = {
    label: 'B',
    isDisabled: false,
    onClick: () => console.log('PRESSED', 'B'),
};
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'B',
    isDisabled: true,
    onClick: () => console.log('PRESSED', 'B'),
};
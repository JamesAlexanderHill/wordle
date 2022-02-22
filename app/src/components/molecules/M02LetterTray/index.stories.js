import React from 'react';

import M02LetterTray from '.';

export default {
    title: 'Molecule/M02LetterTray',
    component: M02LetterTray,
    argTypes: {},
};
  
const Template = (args) => <M02LetterTray {...args} />;
  
export const Default = Template.bind({});
Default.args = {
    isDisabled: false,
};
export const Disabled = Template.bind({});
Disabled.args = {
    isDisabled: true,
};
import React from 'react';
import { translate } from 'react-i18next';
import { Popover, Button, Position } from '@blueprintjs/core';

import LanguageDropdown from '../../../components/app/LanguageDropdown';


const ChangeLanguage = (props) => {
  const {
    i18n
  } = props;

  const renderButton = () => {
    switch (i18n.language) {
      case 'ru': return <Button icon={<img style={{ width: '16px' }} src={require('../../../assets/images/icons/flags/ru.svg')}/>} text="Русский" />;
      default: return <Button icon={<img style={{ width: '16px' }} src={require('../../../assets/images/icons/flags/en.svg')}/>} text="English" />;
    }
  };

  return (
    <div>
      <Popover
        content={<LanguageDropdown/>}
        position={Position.RIGHT_TOP}>
        {renderButton()}
      </Popover>
    </div>
  );
};

const TranslatedComponent = translate()(ChangeLanguage);
export default TranslatedComponent;

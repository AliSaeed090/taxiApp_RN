import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import {BaseColor, BaseStyle, useFont, useTheme} from '../../config';
import {Text} from '../../components';



export type props = {
  open: boolean;
  items?: any;
  setOpen?: any;
  value?: any;
  setValue?: any;
  setItems?: any;
  multiple?: boolean;
  placeholder?: string;
  placeholderStyle?: any;
  loading?: boolean;
  searchable?: boolean;
  error?: boolean;
  errorMessage: string;
  listMode?: any;
  zIndex?:number
  success?: boolean;
  
};

const index = (props: props) => {
  const {colors} = useTheme();
  const cardColor = colors.card;
  const {
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    multiple,
    loading,
    searchable,
    placeholder,
    listMode,
    zIndex,
    errorMessage,
    success,
    // ...attrs
  } = props;
  return (
    <>
    <DropDownPicker
      zIndex={zIndex}
      listMode={listMode}
      style={{
        backgroundColor: cardColor,
        borderWidth: 0,
        borderRadius: 5,
        marginBottom: 5,
        
      }}
      textStyle={{color:colors.text }}
      // containerStyle={{borderRadius: 5}}
      listItemContainerStyle={{backgroundColor: cardColor, }}
      placeholderStyle={{color: errorMessage.length===0 ? BaseColor.grayColor : colors.primary}}
      loading={loading}
      multiple={multiple}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchTextInputProps={{
        maxLength: 25,
      }}
      placeholder={placeholder ?? ''}
      disableLocalSearch={false}
      searchable={searchable}
      searchPlaceholder="Search..."
    />
     {errorMessage&& <Text footnote style={{ color: 'red' }} header={false} title1={false} title2={false} title3={false} headline={false} body1={false} body2={false} callout={false} subhead={false} caption1={false} caption2={false} overline={false} thin={false} ultraLight={false} light={false} regular={false} medium={false} semibold={false} bold={false} heavy={false} black={false} primaryColor={false} darkPrimaryColor={false} lightPrimaryColor={false} accentColor={false} grayColor={false} dividerColor={false} whiteColor={false} fieldColor={false} numberOfLines={0} textAlign={''}>
        {errorMessage}
      </Text>}
    </>
  );
};

export default index;

import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon, { IconsName } from '../Icon';

export type TabsItemIconTypes = IconsName | React.ReactElement | React.ReactNode | JSX.Element;

/** 样式集合类型 */
export interface TabsItemStyle {
  /** 宽度 */
  width?: number;
  /** 文字粗细 */
  titleFontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold' | 'normal';
  /** 文字大小 */
  titleSize?: number;
  /** icon 大小 */
  iconSize?: number;
  /** border 宽度 */
  borderWidth?: number;
  /** border 粗细 */
  borderHeight?: number;
}
export interface TabsItemProps {
  /** 显示的文字 */
  title: string;
  /** 样式集合 */
  style?: TabsItemStyle;
  /**
   * 点击时触发
   * void
   * @param title type: string title 文字
   */
  onPress?: (title: string) => void;
  /** 图标 */
  icon?: TabsItemIconTypes;
  activeColor?: string;
  value?: number;
  onChange?: (value: number) => void;
  index?: number;
}

function TabsItem(props: TabsItemProps) {
  const { activeColor, icon, index, value, onChange } = props;
  console.log('value', value, 'index', index);
  const style = useCallback(() => {
    const { style = {} } = props;
    const titleBoxStyle = {
      width: style.width ?? 100,
    };
    const titleStyle = {
      fontSize: style.titleSize ?? 20,
      color: index === value && activeColor ? activeColor : '#035bb6',
      fontWeight: style.titleFontWeight ?? '600',
    };
    const iconBoxStyle = {
      width: style.width ?? 100,
    };
    const iconStyle = {
      color: index === value && activeColor ? activeColor : '#035bb6',
      size: style.iconSize ?? 24,
    };
    const borderColor = {
      width: style.borderWidth ?? 40,
      borderBottomWidth: style.borderHeight ?? 4,
      borderBottomColor: index === value && activeColor ? activeColor : '#035bb6',
      bottom: 0,
    };
    return {
      titleBoxStyle,
      titleStyle,
      iconBoxStyle,
      iconStyle,
      borderColor,
    };
  }, [value, activeColor]);

  const IconDom = useMemo(() => {
    const isIconDom = () => {
      if (typeof icon === 'string') {
        return <Icon name={icon as IconsName} color={style().iconStyle.color} size={style().iconStyle.size} />;
      } else {
        return <React.Fragment>{icon}</React.Fragment>;
      }
    };
    if (icon) {
      return <View style={[styles.iconBox, { ...style().iconBoxStyle }]}>{isIconDom()}</View>;
    }
    return null;
  }, [icon, props.style, value, activeColor]);

  const BorderDom = useMemo(() => {
    if (value === index) {
      return (
        <View style={styles.bottomView}>
          <View style={[styles.bottom, { ...style().borderColor }]} />
        </View>
      );
    }
    return null;
  }, [value]);

  return (
    <View style={styles.TabsItemContainer}>
      <TouchableOpacity onPress={() => (index === 0 || index) && onChange?.(index)}>
        {IconDom}
        <View style={[styles.titleBox, { ...style().titleBoxStyle }]}>
          <Text style={[styles.title, { ...style().titleStyle }]}>{props.title}</Text>
        </View>
        {BorderDom}
      </TouchableOpacity>
    </View>
  );
}
TabsItem.prototype.isclxItem = {};

const styles = StyleSheet.create({
  TabsItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleBox: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    borderStyle: 'solid',
  },
});
export default TabsItem;

import React, { FC, useContext } from 'react';
import { Tabs } from 'antd';
import cn from 'classnames';
import { FormikHelpers } from 'formik';

import Store from 'Store/installStore';
import theme from 'Lib/theme';
import { danger, p } from 'Common/formating';

import { FormValues } from '../../Install';
import StepButtons from '../StepButtons';
import s from './ConfigureDevices.module.pcss';

const { TabPane } = Tabs;

interface ConfigureDevicesProps {
    values: FormValues;
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const ConfigureDevices: FC<ConfigureDevicesProps> = ({
    values, setFieldValue,
}) => {
    const { ui: { intl } } = useContext(Store);

    const dhcp = (e: string) => (
        // TODO: link to dhcp
        <a href="http://" target="_blank" rel="noopener noreferrer">{e}</a>
    );

    console.log(values);

    return (
        <div>
            <div className={theme.typo.title}>
                {intl.getMessage('install_configure_title')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_block)}>
                {intl.getMessage('install_configure_danger_notice', { danger })}
            </div>
            <div className={theme.typo.subTitle}>
                {intl.getMessage('install_configure_how_to_title')}
            </div>
            <Tabs defaultActiveKey="1" tabPosition="left" className={s.tabs}>
                <TabPane tab="Router" key="1">
                    <div className={cn(theme.typo.text, theme.typo.text_base)}>
                        {intl.getMessage('install_configure_router', { p })}
                    </div>
                </TabPane>
                <TabPane tab="Windows" key="2">
                    <div className={cn(theme.typo.text, theme.typo.text_base)}>
                        {intl.getMessage('install_configure_windows', { p })}
                    </div>
                </TabPane>
                <TabPane tab="Macos" key="3">
                    <div className={cn(theme.typo.text, theme.typo.text_base)}>
                        {intl.getMessage('install_configure_macos', { p })}
                    </div>
                </TabPane>
                <TabPane tab="Linux" key="4">
                    <div className={cn(theme.typo.text, theme.typo.text_base)}>
                        {/* TODO: add linux setup */}
                        {intl.getMessage('install_configure_router', { p })}
                    </div>
                </TabPane>
                <TabPane tab="Android" key="5">
                    <div className={cn(theme.typo.text, theme.typo.text_base)}>
                        {intl.getMessage('install_configure_android', { p })}
                    </div>
                </TabPane>
                <TabPane tab="iOs" key="6">
                    <div className={cn(theme.typo.text, theme.typo.text_base)}>
                        {intl.getMessage('install_configure_ios', { p })}
                    </div>
                </TabPane>
            </Tabs>

            <div className={theme.typo.subTitle}>
                {intl.getMessage('install_configure_adresses')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_base)}>
                {intl.getMessage('')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_base)}>
                {intl.getMessage('install_configure_dhcp', { dhcp })}
            </div>
            <StepButtons
                setFieldValue={setFieldValue}
                currentStep={4}
                values={values}
            />
        </div>
    );
};

export default ConfigureDevices;

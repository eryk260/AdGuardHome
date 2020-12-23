import React, { FC } from 'react';
import { Layout } from 'antd';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';

import { IInitialConfiguration } from 'Entities/InitialConfiguration';
import Icons from 'Lib/theme/Icons';
import {
    DEFAULT_DNS_ADDRESS,
    DEFAULT_DNS_PORT,
    DEFAULT_IP_ADDRESS,
    DEFAULT_IP_PORT,
} from 'Consts/install';

import AdminInterface from './components/AdminInterface';
import Auth from './components/Auth';
import DnsServer from './components/DnsServer';
import Stepper from './components/Stepper';
import Welcome from './components/Welcome';
import ConfigureDevices from './components/ConfigureDevices';

import s from './Install.module.pcss';

const { Content } = Layout;

export type FormValues = IInitialConfiguration & { step: number };

const InstallForm: FC = observer(() => {
    const initialValues: FormValues = {
        step: 0,
        web: {
            ip: [DEFAULT_IP_ADDRESS],
            port: DEFAULT_IP_PORT,
        },
        dns: {
            ip: DEFAULT_DNS_ADDRESS,
            port: DEFAULT_DNS_PORT,
        },
        password: '',
        username: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
        >
            {({ values, handleSubmit, setFieldValue }) => (
                <form noValidate className={s.content} onSubmit={handleSubmit}>
                    <Stepper currentStep={values.step} />
                    {values.step === 0 && (
                        <Welcome onNext={() => setFieldValue('step', 1)}/>
                    )}
                    {values.step === 1 && (
                        <AdminInterface values={values} setFieldValue={setFieldValue} />
                    )}
                    {values.step === 2 && (
                        <Auth values={values} setFieldValue={setFieldValue} />
                    )}
                    {values.step === 3 && (
                        <DnsServer values={values} setFieldValue={setFieldValue} />
                    )}
                    {values.step === 4 && (
                        <ConfigureDevices values={values} setFieldValue={setFieldValue} />
                    )}
                </form>
            )}
        </Formik>
    );
});

const Install: FC = () => {
    return (
        <Layout className={s.layout}>
            <Content className={s.container}>
                <InstallForm />
            </Content>
            <Icons/>
        </Layout>
    );
};

export default Install;

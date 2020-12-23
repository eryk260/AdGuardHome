import InstallApi from 'Apis/install';
import AddressesInfo, { IAddressesInfo } from 'Entities/AddressesInfo';
import { ICheckConfigRequest } from 'Entities/CheckConfigRequest';
import CheckConfigResponse, { ICheckConfigResponse } from 'Entities/CheckConfigResponse';
import { errorChecker } from 'Helpers/apiHelpers';
import { flow, makeAutoObservable } from 'mobx';

import { Store } from 'Store';

export default class Install {
    rootStore: Store;

    addresses: AddressesInfo | null;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
        this.addresses = null;

        makeAutoObservable(this, {
            rootStore: false,
            getAddresses: flow,
        });
        this.getAddresses();
    }

    * getAddresses() {
        const response = yield InstallApi.installGetAddresses();
        const { result } = errorChecker<IAddressesInfo>(response);
        if (result) {
            this.addresses = new AddressesInfo(result);
        }
    }

    static async checkConfig(config: ICheckConfigRequest) {
        const response = await InstallApi.installCheckConfig(config);
        const { result } = errorChecker<ICheckConfigResponse>(response);
        if (result) {
            return new CheckConfigResponse(result);
        }
    }
}

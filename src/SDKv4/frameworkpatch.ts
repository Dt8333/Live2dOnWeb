import { CubismModelSettingJson } from "@framework/cubismmodelsettingjson";
import { Live2DCubismFramework as cubismjson } from '@framework/utils/cubismjson';
import Value = cubismjson.Value;

declare module "@framework/icubismmodelsetting" {
    export interface ICubismModelSetting {
        /**
         * 得到动作音频延迟
         * @param groupName   动作组名
         * @param index   动作索引
         */
        getMotionSoundDelay(groupName: string, index: number): number;
    }

}

const SoundDelay = "SoundDelay";
declare module "@framework/cubismmodelsettingjson" {
    export interface CubismModelSettingJson {
        /**
         * 得到动作音频延迟
         * @param groupName   动作组名
         * @param index   动作索引
         */
        getMotionSoundDelay(groupName: string, index: number): number;
        isExistMotionSoundDelay(groupName: string, index: number): boolean;
    }
}

CubismModelSettingJson.prototype.getMotionSoundDelay = function (
    groupName: string,
    index: number
): number {
    if (!this.isExistMotionSoundDelay(groupName, index)) {
        return 0;
    }

    return this._jsonValue
        .at(2) //FrequestNode.FrequestNode_Motions Framework 5
        .getValueByString(groupName)
        .getValueByIndex(index)
        .getValueByString(SoundDelay)
        .toInt();
};

/**
 * 判断是否存在 SoundDelay 键
 * @param groupName 动作组名
 * @param index 动作索引
 * @private
 */
CubismModelSettingJson.prototype.isExistMotionSoundDelay = function (
    groupName: string,
    index: number
): boolean {
    const node: Value = this._jsonValue
        .at(2) //FrequestNode.FrequestNode_Motions Framework 5
        .getValueByString(groupName)
        .getValueByIndex(index)
        .getValueByString(SoundDelay);
    return !node.isNull() && !node.isError();
};

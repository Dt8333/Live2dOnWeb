import { Live2DCubismFramework as cubismmodelsettingjson } from "@framework/cubismmodelsettingjson";
import { Live2DCubismFramework as cubismjson } from '@framework/utils/cubismjson';
import Value = cubismjson.Value;

declare module "@framework/icubismmodelsetting" {
    export namespace Live2DCubismFramework {
         interface ICubismModelSetting {
            /**
             * 得到动作音频延迟
             * @param groupName   动作组名
             * @param index   动作索引
             */
            getMotionSoundDelay(groupName: string, index: number): number;
        }
    }
}

declare module "@framework/cubismmodelsettingjson" {
    export namespace Live2DCubismFramework {
        const SoundDelay = "SoundDelay";
        interface CubismModelSettingJson {
            /**
             * 得到动作音频延迟
             * @param groupName   动作组名
             * @param index   动作索引
             */
            getMotionSoundDelay(groupName: string, index: number): number;
            isExistMotionSoundDelay(groupName: string, index: number): boolean;
        }
    }
}

cubismmodelsettingjson.CubismModelSettingJson.prototype.getMotionSoundDelay = function (
    groupName: string,
    index: number
): number {
    if (!this.isExistMotionSoundDelay(groupName, index)) {
        return 0;
    }

    return this._jsonValue
        .at(2) //FrequestNode.FrequestNode_Motions Framework 4
        .getValueByString(groupName)
        .getValueByIndex(index)
        .getValueByString(cubismmodelsettingjson.SoundDelay)
        .toInt();
};

/**
 * 判断是否存在 SoundDelay 键
 * @param groupName 动作组名
 * @param index 动作索引
 * @private
 */
cubismmodelsettingjson.CubismModelSettingJson.prototype.isExistMotionSoundDelay = function (
    groupName: string,
    index: number
): boolean {
    const node: Value = this._jsonValue
        .at(2) //FrequestNode.FrequestNode_Motions Framework 4
        .getValueByString(groupName)
        .getValueByIndex(index)
        .getValueByString(cubismmodelsettingjson.SoundDelay);
    return !node.isNull() && !node.isError();
};

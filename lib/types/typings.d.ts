import { Compiler, Compilation } from "webpack";

export = ScriptCatWebpackPlugin;

declare class ScriptCatWebpackPlugin {
  constructor(options?: ScriptCatWebpackPlugin.Options);

  /**
   * Options after html-webpack-plugin has been initialized with defaults
   */
  options?: ScriptCatWebpackPlugin.Options;

  apply(compiler: Compiler): void;
}

declare namespace ScriptCatWebpackPlugin {
  type Options = {
    file: string;
    name: string;
    namespace: string;
    description?: string;
    version?: string;
    author?: string;
    metadata?: { [key: string]: string[] | string };
  };

  type UserConfig = {
    [group: string]: UserConfigGroup;
  };

  type UserConfigGroup = {
    [item: string]: UserConfigItem;
  };

  type UserConfigValue = string | boolean | numbe;

  type UserConfigItem = {
    title: string; // 配置的标题
    description?: string; // 配置的描述内容
    type?: "text" | "checkbox" | "select" | "mult-selec" | "number"; // 选项类型,如果不填写会根据数据自动识别
    default?: UserConfigValue | UserConfigValue[]; // 配置的默认值
    min?: number; // 文本最短字符或者数字最小值
    max?: number; // 文本最长字符或者数字最大值
    unit?: string; // 数字单位
    password?: true; // 设置为密码
    values?: UserConfigValue[]; // 选择列表框的可选项
    bind?: string; // 动态显示绑定的values,值是以$开头的key,value需要是一个数组
  };
}

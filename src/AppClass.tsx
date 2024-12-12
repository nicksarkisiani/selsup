import React, { Component } from "react";
import styles from "./App.module.css";

interface Param {
    id: number;
    name: string;
    type: "string" | "number" | "list";
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    param?: Param[],
    model?: Model,
}

interface State {
    params: Param[];
    paramValues: ParamValue[];
    name: string;
    variant: "string" | "list" | "number";
}

class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            params: [],
            paramValues: [],
            name: "Empty",
            variant: "string",
        };
    }

    handleUpdateParamValues = (newParamValue: ParamValue) => {
        this.setState((prevState) => {
            const paramValues = [...prevState.paramValues];
            paramValues[newParamValue.paramId] = newParamValue;
            return { paramValues };
        });
    };

    getModel = (): Model => {
        return { paramValues: this.state.paramValues };
    };

    handleSubmit = () => {
        const { params, paramValues, name, variant } = this.state;

        const newParam: Param = {
            id: params.length > 0 ? params[params.length - 1].id + 1 : 0,
            name,
            type: variant,
        };

        const newParamValue: ParamValue = {
            paramId: newParam.id,
            value: "Empty",
        };

        this.setState({
            params: [...params, newParam],
            paramValues: [...paramValues, newParamValue],
            name: "Empty",
        });
    };

    handleSave = () => {
        const model = this.getModel();
        console.log(model);
    };

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    };

    handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ variant: e.target.value as "string" | "number" | "list" });
    };

    render() {
        const { params, paramValues, name, variant } = this.state;

        return (
            <div className={styles.mainContainer}>
                {params.length > 0 &&
                    params.map((param, index) => (
                        <div key={index} className={styles.paramContainer}>
                            <label className={styles.paramLabel}>{param.name}</label>
                            <input
                                className={styles.paramInput}
                                value={paramValues[index]?.value || ""}
                                onChange={(e) =>
                                    this.handleUpdateParamValues({
                                        paramId: param.id,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    ))}

                <form
                    className={styles.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.handleSubmit();
                    }}
                >
                    <label className={styles.formLabel}>Type name of new param</label>
                    <input
                        className={styles.formInput}
                        value={name}
                        onChange={this.handleNameChange}
                    />

                    <select
                        className={styles.formSelect}
                        value={variant}
                        onChange={this.handleVariantChange}
                    >
                        <option value="string">String</option>
                        <option disabled value="number">
                            Int
                        </option>
                        <option disabled value="list">
                            List
                        </option>
                    </select>

                    <button type="submit" className={styles.formButton}>
                        Create
                    </button>
                </form>

                <button className={styles.saveButton} onClick={this.handleSave}>
                    Save
                </button>
            </div>
        );
    }
}

export default ParamEditor;

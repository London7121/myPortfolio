import { Segmented, message } from "antd";
import { useState } from "react";
import { FaSun } from "react-icons/fa6";
import { IoSnowOutline } from "react-icons/io5";
import { useSnowEditMutation, useSnowQuery } from "../../../service/api";

export default function SnowBtn() {
    const { data, isLoading: isGetting } = useSnowQuery({});
    const [editSnow, { isLoading: isEditing }] = useSnowEditMutation();

    const [localValue, setLocalValue] = useState<"ON" | "OFF" | null>(null);

    const remoteValue = data?.snowAnimation ? "ON" : "OFF";
    const currentValue = localValue ?? remoteValue;

    const handleChange = async (val: "ON" | "OFF") => {
        setLocalValue(val);

        try {
            await editSnow({ snowAnimation: val === "ON" }).unwrap();
            message.success(`Snow animation ${val}`);
        } catch {
            message.error("Xatolik yuz berdi");
            setLocalValue(remoteValue);
        }
    };

    return (
        <Segmented
            size="middle"
            shape="round"
            value={currentValue}
            disabled={isGetting || isEditing}
            onChange={handleChange}
            options={[
                {
                    value: "ON",
                    label: (
                        <IoSnowOutline
                            size={24}
                            color={currentValue === "ON" ? "#3b82f6" : "#6b7280"} 
                        />
                    ),
                },
                {
                    value: "OFF",
                    label: (
                        <FaSun
                            size={24}
                            color={currentValue === "OFF" ? "#facc15" : "#6b7280"}
                        />
                    ),
                },
            ]}
        />
    );
}
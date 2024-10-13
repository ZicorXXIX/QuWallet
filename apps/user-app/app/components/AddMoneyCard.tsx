"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { DropdownInput } from "@repo/ui/dropdown-input";
import { ToggleOption, ToggleSelect } from "@repo/ui/toggle-select";
import { ChangeEvent, useState } from "react";
import createOnRampTransaction from "../lib/actions/createOnRampTransactions";

export const AddMoneyCard = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [value, setValue] = useState<number>(0);
    async function handleAddMoney() {
        console.log("Adding money");
        await createOnRampTransaction(selectedOption, value)
    }
    function handleAmount(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
        setValue(parseInt(e.target.value));        
    }
    return <>
        <Card title="Add Money" >
            <DropdownInput onChange={handleAmount}/>
            <ToggleSelect >
                <ToggleOption name="Axis" logo="./axis.png" selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </ToggleSelect>
            {selectedOption && (
                <p className="mt-4 text-sm text-gray-600">
                Selected Bank: <span className="font-semibold">{selectedOption} Bank</span>
                </p>
            )}
            <Center>
                <Button className="mt-4" onClick={handleAddMoney}>Add Money</Button>
            </Center>

        </Card>
    </>
}
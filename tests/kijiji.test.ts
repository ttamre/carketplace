/**
 * Unit test for public/kijiji.ts
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

import * as kijiji from '../public/kijiji'

describe('kijiji.ts', () => {

    describe('searchTestDatabase()', () => {
        
        /* Test cases for individual form fields */
        
        it('year', () => {
            let formData:object = {year: "1971"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBe(Number(formData["year"]))
            })
        })

        it('make', () => {
            let formData:object = {make: "BMW"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check make to ensure proper filtering
            results.forEach((car) =>{
                expect(car["make"]).toBe(formData["make"])
            })
        })

        it('model', () => {
            let formData:object = {model: "190e"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            expect(results).not.toHaveLength(0)

            // Then, check model to ensure proper filtering
            results.forEach((car) =>{
                expect(car["model"]).toBe(formData["model"])
            })
        })

        it('price', () => {
            let formData:object = {price: "10000"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{

                if (typeof car["price"] === "string"){
                    car["price"] = Number(car["price"].replace("$", "").replace(",", ""))
                }

                expect(car["price"]).toBeLessThanOrEqual(Number(formData["price"]))
            })
        })

        it('drivetrain', () => {
            let formData:object = {drivetrain: "RWD"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check drivetrain to ensure proper filtering
            results.forEach((car) =>{
                expect(car["drivetrain"]).toBe(formData["drivetrain"])
            })
        })

        it('transmission', () => {
            let formData:object = {transmission: "Manual"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check transmission to ensure proper filtering
            results.forEach((car) =>{
                expect(car["transmission"]).toBe(formData["transmission"])
            })
        })


        /* Test cases for multiple form fields */

        it('empty form data', () => {
            let formData:object = {}
            expect(kijiji.searchTestDatabase(formData)).not.toHaveLength(0)
        })

        it('full form data 1', () => {
            let formData:object = {
                year: "2022",
                make: "Lamborghini",
                model: "Urus",
                price: "334800",
                drivetrain: "AWD",
                transmission: "Auto"
            }

            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)

            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check individual fields to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBe(Number(formData["year"]))
                expect(car["make"]).toBe(formData["make"])
                expect(car["model"]).toBe(formData["model"])
                expect(car["price"]).toBe("$334,800.00")
                expect(car["drivetrain"]).toBe(formData["drivetrain"])
                expect(car["transmission"]).toBe(formData["transmission"])
            })
            
        })

        it('full form data 2', () => {
            let formData:object = {
                year: "1987",
                make: "Mercedes-Benz",
                model: "190e",
                price: "10900",
                drivetrain: "RWD",
                transmission: "Auto"
            }

            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)

            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check individual fields to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBe(Number(formData["year"]))
                expect(car["make"]).toBe(formData["make"])
                expect(car["model"]).toBe(formData["model"])
                expect(car["price"]).toBe("$10,900.00")
                expect(car["drivetrain"]).toBe(formData["drivetrain"])
                expect(car["transmission"]).toBe(formData["transmission"])
            })
        })

        it('full form data 3', () => {
            let formData:object = {
                year: "1974",
                make: "Datsun",
                model: "260z",
                price: "80000",
                drivetrain: "RWD",
                transmission: "Manual"
            }

            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)

            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check individual fields to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBe(Number(formData["year"]))
                expect(car["make"]).toBe(formData["make"])
                expect(car["model"]).toBe(formData["model"])
                expect(car["price"]).toBe("$80,000.00")
                expect(car["drivetrain"]).toBe(formData["drivetrain"])
                expect(car["transmission"]).toBe(formData["transmission"])
            })
        })


        /* Test cases for operators */

        it('>year', () => {
            let formData:object = {year: ">2000"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBeGreaterThan(Number(formData["year"].slice(1)))
            })
        })

        it('<year', () => {
            let formData:object = {year: "<2000"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBeLessThan(Number(formData["year"].slice(1)))
            })
        })

        it('+year', () => {
            let formData:object = {year: "+2000"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBeGreaterThanOrEqual(Number(formData["year"].slice(1)))
            })
        })

        it('-year', () => {
            let formData:object = {year: "-2000"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBeLessThanOrEqual(Number(formData["year"].slice(1)))
            })
        })

        it('=year', () => {
            let formData:object = {year: "=2000"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).toBe(Number(formData["year"].slice(1)))
            })
        })

        it('!year', () => {
            let formData:object = {year: "!2000"}
            let results:Record<string, string|number>[] = kijiji.searchTestDatabase(formData)
            
            // First, check if we get results
            expect(results).not.toHaveLength(0)

            // Then, check year to ensure proper filtering
            results.forEach((car) =>{
                expect(car["year"]).not.toBe(Number(formData["year"].slice(1)))
            })
        })

    })

 

    describe('testing kijiji.validateFormData()', () => {
        it('valid year', () => {
            let formData:object = {year: "1989"}
            let error:Error|undefined = kijiji.validateFormData(formData)
            
            // Year is valid, so error should be undefined
            expect(error).toBeUndefined()
        })

        it('invalid year', () => {
            let formData:object = {year: "3000 BC"}
            let error:Error|undefined = kijiji.validateFormData(formData)
            
            // Year is invalid, so error should be Error("Invalid year")
            expect(error).toBeInstanceOf(Error)
            expect(error?.message).toBe("Invalid year")
        })

        it('valid price', () => {
            let formData:object = {year: "10000"}
            let error:Error|undefined = kijiji.validateFormData(formData)
            
            // Year is valid, so error should be undefined
            expect(error).toBeUndefined()
        })

        it('invalid price', () => {
            let formData:object = {price: "something cheap"}
            let error:Error|undefined = kijiji.validateFormData(formData)
            
            // Price is invalid, so error should be Error("Invalid year")
            expect(error).toBeInstanceOf(Error)
            expect(error?.message).toBe("Invalid price")
        })
        
    })

    describe('testing kijiji.formatPrice()', () => {
        it('CAD', () => {
            let price:number = 10000
            let currency:string = "CAD"
            let formattedPrice:string = kijiji.formatPrice(price, currency)

            expect(formattedPrice).toBe("$10,000.00")
        })

        it('USD', () => {
            let price:number = 10000
            let currency:string = "USD"
            let formattedPrice:string = kijiji.formatPrice(price, currency)

            expect(formattedPrice).toBe("$10,000.00")
        })

        it('GBP', () => {
            let price:number = 10000
            let currency:string = "GBP"
            let formattedPrice:string = kijiji.formatPrice(price, currency)

            expect(formattedPrice).toBe("£10,000.00")
        })
        
    })
})
import React, {useEffect, useState} from 'react'
import './card.css'
import {AutoSizer} from 'react-virtualized';
import {FixedSizeList as List} from "react-window";
import {Layout, Menu, Select} from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons';
import Card from "./card";
import {Button, Input} from "antd";
import {connect} from "react-redux";

import './infiniteLoader.css'
import store from "../../redux/store";

type LoaderProps = {
    data: any,
}
type rowRendererType = {
    key: number, // Unique key within array of rows
    index: any, // Index of row within collection
    isScrolling: any, // The List is currently being scrolled
    isVisible: any, // This row is visible within the List (eg it is not an overscanned row)
    style: any, // Style object to be applied to row (to position it)
}

interface Iprops {
    equipments: any;
    listEquipments: any;
}
const { Option } = Select;
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;



store.dispatch({type: 'GET_EQUIPMENTS'}   );
const Loader = ({equipments, listEquipments}: Iprops) => {


    const [defined, setDefined] = useState(false)

    useEffect(() => {
        if ('type' in equipments) {
            console.log('EQUIPMENTS', equipments)
            setDefined(true)
        }
    }, [equipments])


    const [search, setSearch] = useState('');
    const [filtre, setFiltre] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const {Search} = Input;
    let dataCard: { id: number, img: string, titre: string, status: string, tag: string, brand: string, category: string }[] = [];
    const arrayBrand: string[]= [];
    const arrayCategory: string[]= [];

    type RowType = {
        index: any, // Index of row within collection
        style: any, // Style object to be applied to row (to position it)
    }




    if (defined) {
        console.log('TAILLE', equipments.length)
        equipments.equipments.map((data: any) => {
            const equipement: any = data;
            const key: any = data.id;

            let img: string;
            /*if(!equipement.img.integerValue || equipement.img.integerValue === "null" || equipement.img.integerValue === null || equipement.img.integerValue === '')
            {
                img = 'null';
            } else {
                img = ''+equipement.img.integerValue;
            }*/
            arrayBrand.push(equipement.brand);
            arrayCategory.push(equipement.category);
            let tags: string = equipement.modele+','+equipement.brand+','+equipement.category;
            dataCard.push({
                id: key,
                img: 'null',
                titre: equipement.name,
                status: equipement.status,
                tag: tags,
                brand: equipement.brand,
                category: equipement.category
            });
        });

        let filterData = dataCard.filter(
            (data: any) => {
                return data.titre.toLowerCase().indexOf(
                    search.toLowerCase()
                ) !== -1;
            }
        );

        filterData = filterData.filter(
            (data: any) => {
                return data.brand.toLowerCase().indexOf(
                    brand.toLowerCase()
                ) !== -1;
            }
        );
        filterData = filterData.filter(
            (data: any) => {
                return data.category.toLowerCase().indexOf(
                    category.toLowerCase()
                ) !== -1;
            }
        );

        const Row = ({index, style}: RowType) => {
            const item = filterData[index];

            return (
                <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} key={index} id={'card' + index}
                     style={style}>
                    {item ? <Card img={'null'}
                                  name={filterData[index].titre}
                                  id={filterData[index].id}
                                  tags={filterData[index].tag}
                                  category={filterData[index].category}
                                  status={filterData[index].status}/> : 'Loading...'}
                </div>
            )
        };

        return (

            <div className={'contentLoader'}>
                <span className={'filter'}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => setSearch(value)}
                        style={{width: 200}}
                    />
                      <Select
                          style={{width: 200, marginTop: '20px'}}
                          placeholder="Select a brand"
                          optionFilterProp="children"
                          onChange={(value: any) => setBrand(value)}
                          filterOption={(input: any, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                      >
                        <Option value=""><i style={{opacity: 0.5}}>vide</i></Option>
                          {arrayBrand.map( (data:string)=> {
                              return(
                                  <Option value={data}>{data}</Option>
                              )
                          })}
                      </Select>
                    <Select
                        style={{width: 200, marginTop: '20px'}}
                        placeholder="Select a category"
                        optionFilterProp="children"
                        onChange={(value: any) => setCategory(value)}
                        filterOption={(input: any, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value=""><i style={{opacity: 0.5}}>vide</i></Option>
                        {arrayCategory.map( (data:string)=> {
                            return(
                                <Option value={data}>{data}</Option>
                            )
                        })}
                      </Select>
                </span>
                <AutoSizer>
                    {({height, width}) => (
                        <List itemSize={170}
                              height={600}
                              itemCount={filterData.length}
                              width={width}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
            </div>
        )
    } else {
        return (
            <Button /*onClick={getEquipments}*/>Get Équipments</Button>
        )

    }
}

const mapStateToProps = (state: any) => {
    return {
        equipments: state.dashboardFournisseur.equipments,
        listEquipments: state.dashboardFournisseur.listEquipments
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEquipments: () => dispatch({type: "GET_EQUIPMENTS"})
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Loader);

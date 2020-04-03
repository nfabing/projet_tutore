import React, {useState} from 'react'
import {connect} from "react-redux";
import {AutoSizer} from 'react-virtualized';
import {FixedSizeList as List} from "react-window";
import './card.css'
import {Select} from 'antd';
import Card from "./card";
import {Input, Skeleton} from "antd";


import './infiniteLoader.css'
import store from "../../redux/store";


interface Iprops {
    equipments: any;
    getEquipments: any;
    categories: any;
    getCategories: any;
    uid: any;
    uName: any;
    uEmail: any;
}

const {Option} = Select;


store.dispatch({type: 'GET_ALL_EQUIPMENTS_SEARCH'});
store.dispatch({type: 'GET_CATEGORIES'});
const Loader = ({equipments, getEquipments, categories, getCategories, uid, uName, uEmail}: Iprops) => {


    const [search, setSearch] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const {Search} = Input;
    let dataCard: { id: string, img: string, titre: string, userHandle: string, status: string, tag: string, brand: string, category: string, uid: string, uName: string, uEmail: string }[] = [];
    let arrayBrand: string[] = [];
    const arrayCategory: string[] = [];

    type RowType = {
        index: any, // Index of row within collection
        style: any, // Style object to be applied to row (to position it)
    }

    console.log('Taille', equipments.length);


    if (equipments.length != 0 && categories.length != 0) {
        console.log('EQUIPMENT', equipments);


        equipments.equipments.map((data: any) => {
            const equipement: any = data;
            const key: any = data.id;
            let testBrand: boolean = false;
            for (let j = 0; j < arrayBrand.length; j++) {
                if (arrayBrand[j] === equipement.brand) {
                    testBrand = true;
                }
            }
            if (!testBrand) arrayBrand.push(equipement.brand);
            arrayCategory.push(equipement.category);
            let tags: string = equipement.modele + ',' + equipement.brand + ',' + equipement.category;
            dataCard.push({
                id: key,
                img: equipement.img,
                titre: equipement.name,
                userHandle: equipement.userHandle,
                status: equipement.status,
                tag: tags,
                brand: equipement.brand,
                category: equipement.category,
                uid: uid,
                uName: uName,
                uEmail: uEmail
            });
            console.log('DATA', dataCard);

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
            const category: string = categories.categories.map((cat: any) => {
                if (filterData[index].category === cat.id) return filterData[index].category = cat.name;
            });
            return (
                <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} key={index} id={'card' + index}
                     style={style}>
                    {item ? <Card equipment={filterData[index]}/> : 'Loading...'}

                </div>
            )
        };

        return (

            <div className={'contentLoader'}>
                <span className={'filter'}>
                    <h3>Recherche et filtre</h3>
                    <Search
                        placeholder="Recherche..."
                        defaultValue={search}
                        onSearch={value => setSearch(value)}
                        style={{width: 200}}
                    />
                      <Select
                          style={{width: 200, marginTop: '20px'}}
                          placeholder="Select a brand"
                          optionFilterProp="children"
                          value={brand}
                          onChange={(value: any) => setBrand(value)}
                          filterOption={(input: any, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                      >
                        <Option value=""><i style={{opacity: 0.5}}>vide</i></Option>
                          {arrayBrand.map((data: string) => {

                              return (
                                  <Option key={data} value={data}>{data}</Option>
                              )
                          })}
                      </Select>
                    <Select
                        style={{width: 200, marginTop: '20px'}}
                        placeholder="Select a category"
                        optionFilterProp="children"
                        value={category}
                        onChange={(value: any) => setCategory(value)}
                        filterOption={(input: any, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value=""><i style={{opacity: 0.5}}>vide</i></Option>
                        {categories.categories.map((cat: any) => {
                            return <Option key={cat.id} value={cat.id}>{cat.name}</Option>;
                        })}
                      </Select>
                    <a href={'#'} onClick={() => {
                        setSearch('');
                        setCategory('');
                        setBrand('');
                    }}>Vider les filtres</a>
                </span>
                <AutoSizer>
                    {({height, width}) => (
                        <List itemSize={170}
                              height={height}
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
            <>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        equipments: state.dashboardFournisseur.equipments,
        categories: state.ajoutMateriel.categories,
        uid: state.login.user.uid,
        uName: state.login.user.displayName,
        uEmail: state.login.user.email,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEquipments: () => dispatch({type: "GET_EQUIPMENTS"}),
        getCategories: () => {
            dispatch({type: "GET_CATEGORIES"});
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Loader);

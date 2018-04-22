import React from 'react';
import { ReactiveBase, MultiList, SelectedFilters, RangeSlider, ResultCard, DataSearch } from '@appbaseio/reactivesearch';
import './App.css'

export default () => (
    <div className="container">
        <ReactiveBase
            app="Ted-Finder"
            credentials="V68DxFwZw:5c1c32cd-38c5-4460-99a0-d6f88ed06e8b"
            type="Ted-Finder"
            theme={{
                primaryColor: '#FF3A4E',
            }}
        >
            <nav className="nav">
              <div className="title">Ted Finder</div>
                <DataSearch
                  className="searchbox" 
                  componentId="SearchSensor"
                  dataField="name"
                  placeholder="Search for ted vedios"
                  highlight={true}
                />
                
            </nav>
            <div className="left-col">
            <SelectedFilters
                className="selectedFilters"
                showClearAll={true}
                clearAllLabel="Clear filters"
            />
            <RangeSlider
                componentId="ViewsSliderSensor"
                dataField="views"
                title="Views"
                range={{
                    "start": 500000,
                    "end": 2000000
                }}
                rangeLabels={{
                    start: "50W",
                    end: "200W"
                }}
                stepValue={10000}
                react={{
                    and: ['CatogorySensor'],
                }}
                />
            <MultiList
                title="Categories"
                componentId="Catogory"
                dataField="event.raw"
                size={20}
            />
            </div>

            <ResultCard
                className="right-col"
                componentId="SearchResult"
                dataField="name"
                size={12}
                onData={data => ({
                    image: data.related_talks[1].replace(/[ ,']/g,'').slice(5),
                    title: data.name,
                    description: (
                        <div>
                            <div className="tags">
                                {data.tags.map((tag,index) => {
                                    if (index < 3) {
                                        return (
                                            <span key={index}>{tag.replace(/'/g,'')}</span>
                                        )
                                    }
                                })}
                            </div>
                            <div className="description">
                            {data.description.substr(0,100) + '...'}
                            </div>
                        </div>
                    ),
                    url: data.url,
                })}
                pagination
                react={{
                    and: ['Catogory','ViewsSliderSensor', 'SearchSensor', 'search'],
                }}
                innerClass={{
                    resultStats: 'result-stats',
                    list: 'list',
                    listItem: 'list-item',
                    image: 'image',
                }}
            />
        </ReactiveBase>
    </div>
);
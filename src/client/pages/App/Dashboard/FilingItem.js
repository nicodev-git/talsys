import React, {useEffect, useState} from 'react'
import { Modal, Button, Spin, List, Skeleton, Icon } from 'antd';
import { getFilingHtml } from 'client/actions/secActions';
import { getEventSentences } from 'client/utils/getEventSentences'


const filing_basic_url = "https://www.sec.gov/Archives/edgar/data"
const flter_item = '5.02'


const getCompanyName = (source) => {
  const name = source._source.display_names[0].split('  ')
  name.pop()
  return name.join(' ')
}

function extractContent(htmlString, space) {
	let text = htmlString

	text = text.replace(new RegExp('<b>', 'g'), '')
				.replace(new RegExp('</b>', 'g'), '')
				.replace(/<[^>]+>/g, 'talsysBricker')

  return text
};


const FilingItem = ({item, openDetailModal, documentUrl}) => {
	const [parsing, setParsing] = useState(false)
	const [content, setContent] = useState('')

	useEffect(() => {
		async function fetchData(){
			setParsing(true)
			let response = await getFilingHtml(documentUrl)
			setContent(getEventSentences(extractContent(response, true)))
			setParsing(false)
		}
		fetchData()
	},[item])

	return(
		<List.Item
			style={{display: content?'':'none'}}
      key={item._id}
      actions={[
        <span key="list-file_date">
          <Icon type="clock-circle" style={{ marginRight: 8, fontWeight: 'bold' }} />
          {item._source.file_date}
        </span >,
        <span key="list-location">
          <i className="fa fa-map-marker" style={{ marginRight: 8 }} />
          {item._source.biz_locations[0]}
        </span>,
        <span key="list-file_sic">
          <span style={{marginRight: 8}}><strong>SIC:</strong></span>
          {item._source.sics.join(',')}
        </span>,
        <span key="list-file_cik">
          <span style={{marginRight: 8}}><strong>CIK:</strong></span>
          {item._source.ciks.join(',')}
        </span>
      ]}
      extra={
        <Button icon="eye" shape="round" onClick={() => openDetailModal(item)}>View More</Button>
      }
    >
      <Skeleton title={false} loading={parsing} active>
        <List.Item.Meta
          title={<a href={item.href}>{getCompanyName(item)}</a>}
        />
        <div dangerouslySetInnerHTML={{__html: content}}></div>
      </Skeleton>
    </List.Item>
	)
}


export default FilingItem
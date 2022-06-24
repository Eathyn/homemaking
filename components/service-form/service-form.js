import serviceType from '../../enum/service-type'
import { getEventParam } from '../../utils/utils'

Component({
  properties: {
    form: Object,
  },
  data: {
    typeList: [
      {
        id: serviceType.PROVIDE,
        name: '在提供',
      },
      {
        id: serviceType.SEEK,
        name: '正在找',
      },
    ],
    typePickerIndex: null,
    formData: {
      type: null,
      title: '',
      category_id: null,
      cover_image_id: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_date: '',
      price: '',
    },
  },
  lifetimes: {
    attached() {
      this._init()
    }
  },
  methods: {
    _init() {
      const index = this.data.typeList.findIndex((item) => this.form.type === item.id)
      this.setData({
        typePickerIndex: index !== -1 ? index : null,
        formData: {
          type: this.data.form.type,
          title: this.data.form.title,
          category_id: this.data.form.category_id,
          cover_image_id: this.data.form.cover_image ? this.data.form.cover_image.id : null,
          description: this.data.form.description,
          designated_place: this.data.form.designated_place,
          begin_date: this.data.form.begin_date,
          end_date: this.data.form.end_date,
          price: this.data.form.price
        },
      })
    },
    handleTypeChange(evt) {
      const index = getEventParam(evt, 'value')
      this.setData({
        typePickerIndex: index,
        ['formData.type']: this.data.typeList[index].id,
      })
    }
  }
})

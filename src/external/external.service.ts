import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateExternalDto } from './dto/create-external.dto';
import { UpdateExternalDto } from './dto/update-external.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';

const params = {
  search: {
    text: '',
    page: 0,
    sort: 0,
    pages: {
      range: [0, 2000],
    },
    tag: {
      text: '',
      type: 1,
      tags: [],
      items: {
        included: [
          {
            id: 12,
            name: 'Nakadashi',
            description: null,
            type: 1,
            books_count: 11,
          },
        ],
        excluded: [],
      },
    },
  },
};

@Injectable()
export class ExternalService {
  constructor(private readonly httpService: HttpService) {}

  async create() {
    try {
      const res = await this.httpService.axiosRef.post(
        'https://www1.9hentai.com/api/getBook',
        params,
      );

      return res?.data;
    } catch (error) {
      throw new Error(`Error making POST request: ${error.message}`);
    }
  }

  async findAll() {
    // const res = await this.httpService.axiosRef.get(
    //   'https://www1.9hentai.com/api/getBook',
    // );
    // return res?.data;
  }

  findOne(id: number) {
    return `This action returns a #${id} external`;
  }

  update(id: number, updateExternalDto: UpdateExternalDto) {
    return `This action updates a #${id} external`;
  }

  remove(id: number) {
    return `This action removes a #${id} external`;
  }
}

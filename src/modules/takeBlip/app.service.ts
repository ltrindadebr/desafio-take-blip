import { Injectable, HttpService, BadRequestException } from '@nestjs/common';

import * as qs from 'qs';
import { QueryParamsDto } from './dtos/queryParams.dto';
import { QueryResponseDto } from './dtos/queryResponse.dto';

@Injectable()
export class AppService {
  private readonly githubUrl: string;
  private readonly query: QueryParamsDto;

  constructor(private httpService: HttpService) {
    this.githubUrl = 'https://api.github.com/users/takenet';
    this.query = {
      language: 'C#',
      per_page: '5',
      sort: 'created',
      direction: 'asc',
    };
  }

  async getApiInfos(): Promise<QueryResponseDto[]> {
    try {
      const { language, per_page, sort, direction } = this.query;

      const queryString = qs.stringify({ language, per_page, sort, direction });
      const url = `${this.githubUrl}/repos?${queryString}`;
      const { data } = await this.httpService.get<any>(url).toPromise();

      const detailedRepos: QueryResponseDto[] = data.map((repo) => {
        return {
          title: repo.full_name,
          subtitle: repo.description,
          image: repo.owner.avatar_url,
          url: repo.html_url,
        };
      });

      return detailedRepos;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
